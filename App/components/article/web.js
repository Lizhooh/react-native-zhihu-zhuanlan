import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    WebView,
    ActivityIndicator,
} from 'react-native';
import { color } from '../../config';

// # 自适应 WebView
export default class MyWebView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            opacity: 0,
        };
    }

    get script() {
        return `
            var imglist = [].slice.call(document.querySelectorAll('img'));
            var alist = [].slice.call(document.querySelectorAll('a'));

            imglist.map(function(i) {
                i.src = i.getAttribute('data-actualsrc');
            });

            alist.map(function(i) {
                i.href = '';
            });

            window.addEventListener('load', function(event) {
                (function __isComplete() {
                    if (document.readyState == "complete" &&
                        document.documentElement.offsetWidth > 0) {
                        window.location.hash = 1;
                        document.title = document.body.clientHeight;
                    }
                    else {
                        setTimeout(__isComplete, 50);
                    }
                })();
            });
        `;
    }

    get html() {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8" />
                <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no;" name="viewport" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="referrer" content="never">
                <style>
                    html, body{color: #484848; line-height: 1.55; font-size: 15.5px;
                        background-color: #fff; word-wrap: break-word; overflow: hidden }
                    body{padding: 10px; box-sizing: border-box; -webkit-tap-highlight-color:transparent}
                    .body > p{margin: 16px 0; text-indent: 0px; letter-spacing: 0.5px}
                    // .body > p:first-letter{font-size: 24px; margin: 0 2px; font-weight: normal !important}
                    b{color: #333; font-size: 105%;}
                    br{ margin: 0; padding: 0; display: none }
                    a{color: ${color}; text-decoration: none; max-width: 100%; word-break: break-all;}
                    img{min-width: 60%; max-width: 100%; height: auto; padding: 5px 0; margin: 0 auto;
                        border-radius: 1px; display: block}
                    blockquote {border-left: 3px solid ${color}; color: #888; margin: 5px; padding: 0 8px}
                    blockquote em{font-weight: normal}
                    blockquote b{color: #777}
                    h1{font-size: 22px; font-weight: normal}
                    h2{font-size: 20px; font-weight: normal}
                    h3{font-size: 18px; font-weight: normal}
                    h4{font-size: 16px; font-weight: normal}
                    h5{font-size: 14px; font-weight: normal}
                    h6{font-size: 13px; font-weight: normal}
                    code { color: #555; margin: 0 4px; background-color: #f5f5f5 }
                    pre{background-color: #f6f6f6; font-size: 12px; min-width: 100%; padding: 8px;
                        box-sizing: border-box; overflow-x: auto;
                        line-height: 1.8;
                    }
                    pre code {white-space: pre}
                    pre br {display: block}
                    pre * {word-break: normal}

                    /* 代码高亮 */
                    pre .mi{color: #4b4; font-weight: bold}
                    pre .o{color: #f44; font-weight: bold}
                    pre .na{color: teal; font-weight: bold}
                    pre .k, pre .kd{color: #222; font-weight: bold}
                    pre .c1{color: #998;}
                    pre .s1, pre .nt{color: #3af;}
                    pre .kt{color: #555; font-weight: bold}
                    pre .nf{color: #f63; font-weight: bold}
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

    // 渲染优化
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.html === nextProps.html &&
            this.state.height > 0) return false;
        return true;
    }

    render() {
        const { height, opacity } = this.state;

        return (
            <View collapsable={true}>
                <WebView
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    scalesPageToFit={false}
                    injectedJavaScript={this.script}
                    style={{ height: height, opacity: opacity }}
                    source={{ html: this.html }}
                    // onMessage={this.props.onMessage}
                    onNavigationStateChange={document => {
                        if (document.title) {
                            if (height === document.title) return;
                            if (document.title.length > 10 || isNaN(document.title * 1)) return;

                            this.setState({
                                height: Number.parseInt(document.title) + 10,
                                opacity: 1,
                            }, _ => {
                                this.props.onLoad && this.props.onLoad(document);
                            });
                        }
                        return false;
                    } }
                    />
                <ActivityIndicator
                    animating={opacity == 0}
                    color={color}
                    size={'small'}
                    style={{ height: 100 }}
                    />
            </View>
        );
    }
}

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        minHeight: 300,
    },
    loading: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
