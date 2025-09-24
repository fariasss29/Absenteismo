import { v4 as uuidv4 } from 'uuid';

// Mapeia o 'partnumber' do front-end para o nome da coluna no banco de dados
const partnumberToColumnMap = {
    'Absenteeism': 'absenteeism',
    'Absenteeism Fixo': 'absenteeism_fixo',
    'Abs. (Just/ Injust/ Atest)': 'abs_just_injust_atest',
    'Ac. Absent. Fixo': 'ac_absent_fixo',
    'Ac. Abs. (Just/ Injust/ Atest)': 'ac_abs_just_injust_atest',
    'Acumulado Total': 'acumulado_total',
    'Absent. Faltas Legal': 'absent_faltas_legal',
    'Target': 'target',
    '2024': 'ano_2024',
    '2025': 'ano_2025'
};

export class UpdateAbesenteismo {
    constructor(db) {
        this.db = db;
    }

    async execute(payload) {
        let conn;
        try {
            conn = await this.db.getConnection();
            const { changedRows = [], month, view } = payload;

            if (!changedRows.length) {
                // É melhor retornar um objeto do que lançar um erro aqui
                return { success: true, message: "Nenhuma linha alterada para salvar." };
            }
            
            await conn.beginTransaction();

            for (const row of changedRows) {
                const columnName = partnumberToColumnMap[row.partnumber];
                if (!columnName) continue;

                for (const key in row.values) {
                    const value = row.values[key];
                    if (value === null) continue;

                    if (view === 'Mensal') {
                        const day = key.split('/')[0];
                        const date = `${month}-${day}`;

                        const sqlSelect = `SELECT uuid FROM absenteismo WHERE data = ?`;
                        const [existingRows] = await conn.query(sqlSelect, [date]);

                        if (existingRows.length > 0) {
                            const existingUuid = existingRows[0].uuid;
                            const sqlUpdate = `UPDATE absenteismo SET ${conn.escapeId(columnName)} = ? WHERE uuid = ?`;
                            await conn.query(sqlUpdate, [value, existingUuid]);
                        } else {
                            const newUuid = uuidv4();
                            const sqlInsert = `INSERT INTO absenteismo (uuid, data, ${conn.escapeId(columnName)}) VALUES (?, ?, ?)`;
                            await conn.query(sqlInsert, [newUuid, date, value]);
                        }
                    }
                }
            }

            await conn.commit();
            
            // Retorna um objeto de sucesso para o Controller
            return { success: true, data: "Dados salvos com sucesso." };

        } catch (error) {
            if (conn) await conn.rollback();
            // Lança o erro para o Controller tratar
            throw error;
        } finally {
            if (conn) conn.release();
        }
    }
}
