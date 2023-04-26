type ButtonType = 'default' | 'primary'

interface Props {
  type?: ButtonType
  onClick?: () => void
  key?:string
}

export default class Button extends React.Component<Props> {
  
  render() {
    return (
      // <button className="default">默认按钮</button>
      <button 
      className={(this.props.type==="primary")?"primary":"default"}
      onClick={()=>{{this.props.onClick?this.props.onClick():''}}} 
      >
      {this.props.children}
      </button>
    )
  }
  
}