import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    WebView,
    Text,
    Image,
} from 'react-native';
import {
    color,
} from '../common';
import css from './_css';

// # 自适应 WebView
export default class MyWebView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            height: 0,
        };
    }

    static defaultProps = {
        onLoad: () => { },
        onMessage: () => { },
    };

    static propTypes = {
        onLoad: PropTypes.func,
        onMessage: PropTypes.func,
    };

    get script() {
        return `
            window.addEventListener('load', function(event) {
                window.location.hash = 1;
                document.title = document.body.clientHeight;

                var alist = [].slice.call(document.querySelectorAll('a'));

                function linkClick(event) {
                    window.postMessage &&
                    window.postMessage(event.target);
                }

                for(var i in alist) {
                    alist[i].removeEventListener('click', linkClick);
                    alist[i].addEventListener('click', linkClick);
                }
            });
        `;
    }

    get html() {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8" />
                <meta content="width=device-width, initial-scale=1.0, user-scalable=0;" name="viewport" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <style>
                    html, body{color: #555; line-height: 1.5; font-size: 15px;}
                    p{margin: 20px 0 !important; text-indent: 30px; letter-spacing: 0.5px;}
                    p:first-letter{ font-size: 24px; margin: 0 2px;}
                    b{font-weight: normal; color: #111;}
                    a {color: ${color} !important; text-decoration: none !important;}
                    img{width: 100% !important; height: auto !important;}
                    blockquote {border-left: 3px solid ${color}; color: #888; margin: 5px; padding: 0 8px; }
                    blockquote p{text-indent: 0;}
                    blockquote p:first-letter{font-size: 15px; margin:0; color:#888;}
                    blockquote em{font-weight: normal !important;}
                    body{ padding: 10px; box-sizing: border-box;}
                    code, pre{ font-size: 14px; width: 100%; padding: 10px; box-sizing: border-box; overflow: auto; word-wrap: normal;}
                </style>
            </head>
            <body>
                <div class="body">
                    ${this.props.html}
                </div>
                <script>
                    ${this.script}
                </script>
            </body>
            </html>
        `;
    }

    render() {
        return (
            <View style={$.contanier}>
                <WebView
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    scalesPageToFit={false}
                    injectedJavaScript={this.script}
                    style={{ height: this.state.height }}
                    source={{ html: this.html }}
                    onMessage={this.props.onMessage}
                    onNavigationStateChange={document => {
                        if (document.title) {
                            if (this.state.height === document.title) return;

                            this.setState({
                                height: parseInt(document.title) + 50,
                            }, () => {
                                this.props.onLoad(document);
                            });
                        }
                    } }
                    />
            </View>
        );
    }
}

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
    },
});