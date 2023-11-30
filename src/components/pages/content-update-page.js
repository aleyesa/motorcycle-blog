import React, { Component } from "react";
import ContentLayout from "./layout/content-layout";
import ContentForm from "./forms/content-form";

export default class ContentUpdatePage extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <ContentLayout />
                <ContentForm />
            </div>

        )
    }
}