import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" href="#h">
       Settings
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" href="#h">
      Logout
      </a>
    </Menu.Item>
  </Menu>
);

const UserSettings =()=>{
return(
   <Dropdown overlay={menu}>
    <a href="#h" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Jeanndo <DownOutlined />
    </a>
  </Dropdown>
)

}


export default UserSettings;