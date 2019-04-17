import React from 'react'
import DescriptionList from '@/components/DescriptionList'
import { Card, Divider } from 'antd'

const { Description } = DescriptionList;

class DetailTmp extends React.PureComponent {


  render() {
    const { description = [] } = this.props
    return (
      <Card bordered={false}>
        {
          description.map((item, index) => (
            <React.Fragment>
              <DescriptionList size="large" title={item.title} style={{ marginBottom: 32 }}>
                {
                  item.descriptionList.map((descriptionItem) => (
                    <Description term={descriptionItem.label}>{descriptionItem.value}</Description>
                  ))
                }
              </DescriptionList>
              {
                index !== description.length - 1 && (
                  <Divider style={{ marginBottom: 32 }} />
                )
              }
            </React.Fragment>
          ))
        }
      </Card>
    )
  }
}

export default DetailTmp
