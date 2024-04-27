import {Fragment} from "react"
import {Category, Component, Palette, Variant,} from "@react-buddy/ide-toolbox"
import JiraCard from "../components/UI/JiraCard.jsx";

export const PaletteTree = () => (
    <Palette>
        <Category name="App">
            <Component name="Loader">
                <Variant>
                    <ExampleLoaderComponent/>
                </Variant>
            </Component>
            <Component name="JiraCard">
                <Variant name="In app">
                    <JiraCard/>
                </Variant>
            </Component>
        </Category>
    </Palette>
)

export function ExampleLoaderComponent() {
    return (
        <Fragment>Loading...</Fragment>
    )
}