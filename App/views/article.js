import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    InteractionManager,
} from 'react-native';
import { connect } from 'react-redux';
import { articleActions } from '../redux/actions';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll/src';
import { Web, Column, Header, Recomm } from '../components/article';
import { Topbar, StaticView } from '../components';
import { color } from '../config';

class Article extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ok: false,
            data: {},
            contributed: {},
            recomm: {},
            id: 0,
            loadedweb: false,
        }
        this.completed = false;
    }

    async componentDidMount() {
        await InteractionManager.runAfterInteractions();
        const res = await this.props.init(this.props.data.slug);
        this.setState({ ...res, ok: true });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !this.completed;
    }

    // 顶端栏
    renderTopbar = ({commentsCount = 0, likesCount = 0} = {}, id) => (
        <Topbar onBack={this.props.navigator.pop} icons={[
            { name: 'image-aspect-ratio', text: `${commentsCount}`, onPress: this.openComment },
            { name: 'favorite-border', text: `${likesCount}`, size: 22 },
            { name: 'share', size: 22 },
        ]} reverse={true} style={{ backgroundColor: 'transparent' }} />
    );

    // 文章头部
    renderHeader = (title, data, cont) => (
        <Header title={title} data={data} cont={cont} openColumn={this.openColumn} />
    );

    // 文章主体
    renderBody = data => (
        <Web html={data.content}
            onLoad={e =>
                this.setState({ loadedweb: true }, () => this.completed = true)
            }
            />
    );

    // 推荐列表
    renderRecomm = (data, recomm) => (
        <StaticView>
            <Recomm data={data} recomm={recomm}
                onOpenArticle={this.openArticle} />
        </StaticView>
    );

    openArticle = item => {
        this.props.navigator.push({
            name: 'Article',
            data: item,
            animated: 'top',
        });
    }

    openColumn = column => {
        this.props.navigator.push({
            name: 'Column',
            data: column,
        });
    }

    // 打开评论
    openComment = e => {
        const { id, data } = this.state;
        this.props.navigator.push({
            name: 'ArticleComment',
            data: { id: id, n: data.commentsCount },
            animated: 'top',
        });
    };

    renderBackgroundImage = (image) => (
        <StaticView style={{ height: 240 }} >
            <Image
                source={{ uri: image }}
                style={$.bg}
                resizeMethod='resize'
                />
            <View style={$.shade}></View>
        </StaticView>
    )

    render() {
        const { id, data, recomm, contributed, ok, loadedweb } = this.state;
        const pdata = this.props.data;
        const titleImage = pdata.titleImage || data.titleImage;

        // 输出
        return (
            <View style={$.contanier}>
                <ParallaxScroll
                    ref={s => this.scrollView = s}
                    style={{ flex: 1 }}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderHeader={() =>
                        this.renderTopbar(data, id)
                    }
                    headerHeight={40 + 25}
                    isHeaderFixed={true}
                    parallaxHeight={titleImage ? 240 : 65}
                    headerBackgroundColor={titleImage ? 'transparent' : '#fff'}
                    headerFixedBackgroundColor={'#fff'}
                    renderParallaxBackground={() =>
                        titleImage ? this.renderBackgroundImage(titleImage) : <View />
                    }
                    >
                    {this.renderHeader(pdata.title, data, contributed)}
                    {ok && data.content && this.renderBody(data)}
                    {ok && loadedweb && this.renderRecomm(data.meta, recomm)}
                </ParallaxScroll>
            </View>
        );
    }
}

export default connect(
    state => ({ state: state.article }),
    articleActions,
)(Article);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    span: {
        margin: 4,
    },
    spanText: {
        color: color,
        top: -1,
    },
    bg: {
        width: '100%',
        height: '100%',
    },
    shade: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(1, 1, 1, 0.2)',
    },
    topbarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        height: 50,
    }
});