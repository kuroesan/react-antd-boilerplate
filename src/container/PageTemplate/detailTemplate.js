import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import DetailTmp from '@/components/Template/detailTmp'

class detailTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  render() {
    return (
      <PageHeaderWrapper title={this.props.title}>
        <DetailTmp description={this.state.data} />
      </PageHeaderWrapper>
    )
  }
}

export default detailTemplate
