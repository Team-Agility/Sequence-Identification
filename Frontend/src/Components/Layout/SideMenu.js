import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Context } from "../../ConfigProvider";

//STYLES
import { Menu, Modal } from "antd";
import {HomeOutlined,FolderOpenOutlined,CodeOutlined} from "@ant-design/icons";

const { SubMenu } = Menu;

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      user: "",
      role: "",
      selectedKey: "",
      visibleConfirmation: false,
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  goToLogin = () => {
    this.props.history.push({
      pathname: "/login",
      state: "",
    });
  };

  handleCancel = () => {
    this.setState({
      visibleConfirmation: false,
    });
  };

  onMenuClick = (item) => {
    if (item.key == 2 || item.key == 3 || item.key == 4 || item.key == 5) {
      if (!this.state.user) {
        this.setState({
          visibleConfirmation: true,
        });
      } else {
        var path = item.item.props.link;
        this.props.history.push({
          pathname: `${path}`,
          state: "",
        });
      }
    }
  };

  componentDidMount() {
    var usersession = localStorage.getItem("usersession");
    if (usersession) {
      var userSessionObj = JSON.parse(usersession);
      var user = userSessionObj.User;
      this.setState({
        role: userSessionObj.Role[0],
        user: user,
      });
    }
  }

  render() {
    const { setMenuKey, sideMenuKey } = this.context;
    return (
      <div>
        <Menu
          mode="inline"
          theme="dark"
          onClick={this.onMenuClick}
          onSelect={(e) => setMenuKey(e.key)}
          selectedKeys={[sideMenuKey]}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>

          <Menu.Item key="inputs" icon={<FolderOpenOutlined />}>
            <Link to="/inputs">Inputs</Link>
          </Menu.Item>

          <Menu.Item key="output" icon={<CodeOutlined />}>
            <Link to="/output">Output</Link>
          </Menu.Item>
        </Menu>

        {/*///////////////////////////confirmation Modal///////////////////////////////*/}
        <Modal
          title={"Please log in or sign up to continue"}
          visible={this.state.visibleConfirmation}
          okText={"Continue"}
          width={400}
          onOk={this.goToLogin}
          onCancel={this.handleCancel}
        >
          <p>Continue to login?</p>
        </Modal>
      </div>
    );
  }
}

SideMenu.contextType = Context;
export default withRouter(SideMenu);
