import { ICard } from "./types.js";

interface Props {
  card: ICard;
}

export default class CardItem extends React.Component<Props> {
  render() {
    let { card } = this.props;
    return (
      <React.Fragment>
        <div className="card">
          <div className="imgbox">
            <img src={card.cover} alt="" />
          </div>
          <div className="img-bottom">
            <div className="left">
              <img src={card.avatar} alt="" />
              <span className="author-name">{card.name}</span>
              {card.badge.length > 0 && (
                <span className="badge">{card.badge}</span>
              )}
            </div>
            <div className="right">
              <img src="./imgs/icon-like.svg" alt="" />
              <span>{card.likes}</span>
              <img src="./imgs/icon-view.svg" alt="" />
              <span>{card.views}</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
