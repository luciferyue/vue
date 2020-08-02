// useRouteMatch, useHistory, useLocation, useParams
import React from "react";
import { RouterContext } from "./Context"

export function useRouteMatch() {
	return React.useContext(RouterContext).match
}

export function useHistory() {
	return React.useContext(RouterContext).history
}

export function useLocation() {
	return React.useContext(RouterContext).location
}

export function useParams() {
	const match = React.useContext(RouterContext).match
	return match ? match.params : {}
}