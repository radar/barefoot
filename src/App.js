import React from "react";
import "./App.scss";
import Numeral from "numeral";

class Account extends React.Component {
  state = {
    percentage: this.props.percentage
  };

  changePercentage = e => {
    const value = e.target.value;
    const { percentageChanged, name } = this.props;

    percentageChanged(name, value);
    this.setState({ percentage: value });
  };

  render() {
    const { name, income } = this.props;
    const { percentage } = this.state;

    return (
      <div className="form-group row">
        <div className="col-4 text-right">
          <label className="col-form-label" htmlFor="income">
            {name}
          </label>
        </div>
        <div className="col-5">
          <div className="input-group">
            <input
              className="form-control"
              type="number"
              id="income"
              max={100}
              min={0}
              defaultValue={percentage}
              onChange={this.changePercentage}
            />
            <div className="input-group-append">
              <span className="input-group-text">%</span>
            </div>
          </div>
        </div>
        <div className="col-1 amount">
          {Numeral((income / 100) * percentage).format("$0,0.00")}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    accounts: this.props.accounts,
    income: 0,
    billionare: false,
    showDetails: false
  };

  changeIncome = e => {
    this.setState({ income: e.target.value });
    this.setState({ billionaire: e.target.value >= 1_000_000_000 });
  };

  renderBillionaireMessage() {
    if (this.state.billionaire) {
      return (
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            <div className="too-rich text-center">
              You are too rich. Have you considered being not so greedy?
            </div>
          </div>
        </div>
      );
    }
  }

  percentageChanged = (name, percentage) => {
    let accounts = this.state.accounts;
    accounts[name] = Number(percentage);
    window.localStorage.setItem("accounts", JSON.stringify(accounts));
    this.setState({ accounts: accounts });
  };

  renderAccounts = () => {
    const { accounts, income } = this.state;
    return Object.keys(accounts).map((name, i) => {
      return (
        <Account
          key={i}
          name={name}
          percentageChanged={this.percentageChanged}
          percentage={accounts[name]}
          income={income}
        />
      );
    });
  };

  renderTotal = () => {
    const total = Object.values(this.state.accounts).reduce(
      (total, percentage) => total + percentage
    );
    const tickOrCross = total === 100 ? "✅" : "❌";
    return (
      <div className="form-group row">
        <div className="col-4 text-right">
          <label className="col-form-label" htmlFor="total">
            Total
          </label>
        </div>
        <div className="col-5">
          <div className="input-group">
            <input
              className="form-control"
              type="number"
              id="total"
              value={total}
              disabled
            />
            <div className="input-group-append">
              <span className="input-group-text">%</span>
            </div>
          </div>
        </div>
        <div className="col-1 green-tick">{tickOrCross}</div>
      </div>
    );
  };

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  renderDetails() {
    if (!this.state.showDetails) {
      return;
    }
    return (
      <div class="offset-3 col-md-6">
        <p>
          This app calculates a budget split, using the account names and
          percentages from{" "}
          <a href="https://barefootinvestor.com/books/">
            The Barefoot Investor
          </a>{" "}
          book.
        </p>

        <p>
          This website is not associated with the book or the author; I'm just a
          fan. I created this website to make it easier for my wife and I to
          split up our money into the correct bank accounts.
        </p>

        <p>
          This application stores <em>just the percentages</em> on your own
          devices. Nothing is stored on this server. Especially not incomes! If
          you'd like to confirm that, the code is over here{" "}
          <a href="https://github.com/radar/barefoot">on GitHub</a>.
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderBillionaireMessage()}
        <h1 className="text-center">Barefoot Budget</h1>
        <form>
          <div className="form-group row">
            <div className="col-4 text-right">
              <label className="col-form-label" htmlFor="income">
                Income
              </label>
            </div>
            <div className="col-5">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  className="form-control"
                  type="number"
                  id="income"
                  onChange={this.changeIncome}
                />
              </div>
            </div>
            <div className="col-1 amount">
              {Numeral(this.state.income).format("$0,0.00")}
            </div>
          </div>

          {this.renderAccounts()}
          {this.renderTotal()}
        </form>

        <div className="text-center details">
          <a href="#" onClick={this.toggleDetails}>
            What is this?
          </a>
          {this.renderDetails()}
        </div>
      </div>
    );
  }
}

export default App;
