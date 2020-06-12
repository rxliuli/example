import React, { PropsWithChildren } from 'react'
import { HeaderNavItem } from './model/HeaderNavItem'
import { Breadcrumb, Card, Col, Row } from 'antd'
import { TypeValidator } from 'rx-util'
import { Link } from 'react-router-dom'

type PropsType = PropsWithChildren<{
  list: HeaderNavItem[]
}>

const CommonHeader: React.FC<PropsType> = React.memo(
  ({ list, children }: PropsType) => {
    return (
      <Card>
        <Row style={{ background: '#fff' }}>
          <Col span={12}>
            <Breadcrumb>
              {list.map((item, i) => (
                <Breadcrumb.Item key={i}>
                  {TypeValidator.isString(item) ? (
                    item
                  ) : !item.link ? (
                    item.name
                  ) : (
                    <Link to={item.link!}>{item.name}</Link>
                  )}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </Col>
          <Col span={6} offset={6}>
            {children}
          </Col>
        </Row>
      </Card>
    )
  },
)
export default CommonHeader
