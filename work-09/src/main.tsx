import * as request from "./request.js";
import { ICard } from "./types.js";
import CardItem from "./CardItem.js";
interface State {
  list: ICard[];
  open: number;
}

class App extends React.Component<any, State> {
  state: State = {
    list: [],
    open: 0,
  };

  getData = async () => {
    let list = await request.get<ICard[]>("data/task.json");
    this.setState({
      list,
    });
  };

  openMenu = () => {
    this.setState({
      open: 0,
    });
    console.log(this.state);
  };
  closeMenu = () => {
    this.setState({
      open: 1,
    });
    console.log(this.state);
  };

  componentDidMount() {
    this.getData();
    console.log(this.state);
  }
  render() {
    return (
      <React.Fragment>
        <header className="header">
          {this.state.open === 0 && (
            <img
              src="./imgs/icon-menu.svg"
              alt=""
              className="menu open"
              onClick={this.closeMenu}
            />
          )}
          {this.state.open === 1 && (
            <img
              src="./imgs/icon-close.svg"
              alt=""
              className="menu close"
              onClick={this.openMenu}
            />
          )}
          <img src="./imgs/logo-black.svg" alt="" className="top-center" />
          <div className="menu-items">
            <span>Inspiration</span>
            <span>Find Work</span>
            <span>Learn Design</span>
            <span>Go Pro</span>
            <span>Marketplace</span>
            <span>Hire Designers</span>
          </div>
          <div className="head-right">
            <span className="login">Sign in</span>
            <span className="sign-btn">Sign up</span>
          </div>
        </header>
        {this.state.open === 1 && (
          <div className="menu-inner content">
            <ul>
              <li>Inspiration</li>
              <li>Find Work</li>
              <li>Learn Design</li>
              <li>Go Pro</li>
              <li>Marketplace</li>
              <li>Hire Designers</li>
            </ul>
          </div>
        )}
        <main className="main">
          <div className="container">
            <img src="./imgs/banner.webp" alt="" />
            <div className="text">
              <span className="title">
                Discover the world's top designers & creatives
              </span>
              <span className="des">
                Dribbble is the leading destination to find & showcase creative
                work and home to the world's best design prefessionals.
              </span>
              <span className="sign-btn">Sign up</span>
            </div>
          </div>
          {/* <!-- 列表 --> */}
          <div className="list">
            {this.state.list.map((item, index) => {
              return <CardItem key={index} card={item}></CardItem>;
            })}
          </div>
          {/* <!-- 底部 --> */}
          <footer className="footer">
            <img src="./imgs/logo-red.svg" alt="" />
            <div className="foot-text">
              Dribbble is the world’s leading community for creatives to share,
              grow, and get hired.
            </div>
          </footer>
        </main>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
