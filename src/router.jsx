import { FC } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { BetInfo } from "./pages/BetInfo"
import { Dashboard } from "./pages/Dashboard"


export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/get-bet/:id" >
          <BetInfo />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
