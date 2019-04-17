import React from 'react';
import { Layout, Icon } from 'antd';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 12, textAlign: 'center' }}>
    Copyright <Icon type="copyright" /> 2018-2019
  </Footer>
);

export default FooterView;
