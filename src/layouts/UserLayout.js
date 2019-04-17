import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Configure from '@/config/configure'
import styles from './UserLayout.less';



class UserLayout extends React.PureComponent {

  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={Configure.logo} />
                <span className={styles.title} >{Configure.webname}</span>
              </Link>
            </div>
            <div className={styles.desc}>{Configure.descript}</div>
          </div>
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default UserLayout;
