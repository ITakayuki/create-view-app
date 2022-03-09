import View from "@itkyk/view";

class Test extends View.Page {
  constructor(props) {
    super(props);
    this.init(this.initialize);
  }

  initialize =() => {
    console.log(this.section);
    console.log("reference is ", this.refs);
  }

  clickFunc = () => {
    console.log("click!a")
  }

}

View.createComponent("#test", Test);


class Component extends View.Component {
  constructor(props) {
    super(props);
    this.init(()=>{
      console.log(this.refs);
    })
    this.counter = 0;
    this.test = "";
  }

  watch = () => {
    return {
      counter: () => {
        this.refs.count.innerHTML = this.counter
      },
      text: () => {
        console.log("change")
      }
    }
  }

  clickFunc = (e) => {
    this.counter ++;
  }

  changeInput = (e) => {
    console.log(e)
      this.text = e.value;
  }

}

View.createComponent(".component", Component)