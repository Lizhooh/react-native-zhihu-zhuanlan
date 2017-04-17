import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    WebView,
    Text,
    Image,
    ActivityIndicator,
} from 'react-native';
import {
    color,
} from '../common';

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
            var imglist = [].slice.call(document.querySelectorAll('img'));
            var alist = [].slice.call(document.querySelectorAll('a'));

            imglist.map(function(i) {
                i.src = i.getAttribute('data-actualsrc');
            });

            function linkClick(event) {
                event.preventDefault();
                window.postMessage &&
                window.postMessage(event.target.href);
                return false;
            }

            alist.map(function(i) {
                i.removeEventListener('click', linkClick);
                i.addEventListener('click', linkClick);
            });

            window.addEventListener('load', function(event) {
                window.location.hash = 1;
                document.title = document.body.clientHeight;
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
                <meta name="referrer" content="never">
                <style>
                    html, body{color: #505050; line-height: 1.55; font-size: 15px;
                        background-color: #fff; word-wrap:break-word}
                    body{padding: 10px; box-sizing: border-box; -webkit-tap-highlight-color:transparent}
                    .body > p{margin: 16px 0; text-indent: 0px; letter-spacing: 0.5px}
                    .body > p:first-letter{font-size: 24px; margin: 0 2px; font-weight: normal !important}
                    b{font-weight: normal; color: #000}
                    a{color: ${color}; text-decoration: none; max-width: 100%; word-wrap: break-word}
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
                    code, pre{background-color: #f6f6f6; font-size: 12px; width: 100%; padding: 8px;
                        box-sizing: border-box; overflow: auto; word-wrap: break-word;
                        line-height: 1.9; white-space: pre}
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

    // 优化
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.html === nextProps.html &&
            this.state.height > 0) return false;

        return true;
    }

    render() {
        return (
            <View style={$.contanier}>
                {
                    this.state.height === 0 &&
                    <View style={$.loading}>
                        <ActivityIndicator
                            animating={true}
                            size="small"
                            color={color}
                            />
                    </View>
                }
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

                            setTimeout(_ => {
                                this.setState({
                                    height: parseInt(document.title) + 30,
                                }, _ => {
                                    this.props.onLoad(document);
                                });
                            }, 50);
                        }
                        return false;
                    } }
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