import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    file: "",
    imagePreviewUrl: "",
    message: ""
  };

  uploadImage(imagefile) {
    const formData = new FormData();
    formData.append("imageFile", imagefile);
    fetch("/upload", {
      method: "POST",
      body: formData
    })
      .then(result => result.json())
      .then(res => {
        this.setState({
          message: res.success ? "上傳成功" : "上傳失敗"
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.uploadImage(this.state.file);
  };

  handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        message: ""
      });
    };

    reader.readAsDataURL(file);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">簡易圖片上傳</h1>
        </header>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="file" onChange={this.handleImageChange} />
            <input type="submit" value="上傳" onClick={this.handleSubmit} />
          </form>
          <p>{this.state.message}</p>
          {this.state.imagePreviewUrl ? (
            <img alt={this.state.imagePreviewUrl} src={this.state.imagePreviewUrl} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
