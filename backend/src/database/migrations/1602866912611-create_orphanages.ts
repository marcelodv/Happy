import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602866912611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // Realizar alterações [criar campo, tabela, deltar algum campo etc]
        await queryRunner.createTable(new Table({
            name: "orphanages",
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'about',
                    type: 'text',
                },
                {
                    name: 'instrucions',
                    type: 'text',
                },
                {
                    name: 'open_on_weekend',
                    type: 'boolean',
                    default: false      
                },
                {
                    name: 'opening_hours',
                    type: 'varchar'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        // Desfazer o que se fez no UP
        await queryRunner.dropTable('Orphanages')
    }

}
