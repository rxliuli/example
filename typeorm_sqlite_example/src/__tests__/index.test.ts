import path from 'path'
import {Column, ConnectionManager, Entity, getConnection, PrimaryColumn} from 'typeorm'

@Entity('user')
export class User {
  @PrimaryColumn({type: 'number'})
  id!: number
  @Column({type: 'string'})
  name!: string
  @Column({type: 'number'})
  age!: number
}


it('基本示例', async () => {
  const connectionManager = new ConnectionManager()
  const connection = connectionManager.create({
    type: 'sqlite',
    database: path.resolve(__dirname, './resource/test.sqlite'),
    entities: [User],
    logger: 'simple-console',
  })
  await connection.connect()
  const userDao = getConnection().getRepository(User)
  await userDao.find()
})
