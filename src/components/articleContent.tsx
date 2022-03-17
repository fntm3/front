import React from 'react';
import ReactMarkdown from 'react-markdown'
import {IArticle} from '../store/articles/articles-store';
import useArticle from "../hooks/useArticle";
import {useParams} from "react-router-dom";
import {Box, Divider, Paper, Typography} from "@mui/material";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism'
import moment from 'moment';
import Loading from "./loading";

export interface IArticleTileProps {
    article: IArticle;
}

export default function ArticleContent() {
    let {articleId} = useParams();
    const [loading, article] = useArticle(articleId as string);
    const {payload} = article;
    if (loading) return <Loading />;
    if (payload?.content === undefined) return <h1>Error</h1>;


    return (
        <Box style={{margin: '25px 0 80px 0'}}>
            <Paper>
                <Box style={{padding: '10px 20px 20px 20px'}}>
                    <Box style={{margin: '15px 0 15px 0'}}>
                        <Typography variant="subtitle1">{`${payload.title} - ${moment(payload.createdDate).format('LLL')}`}</Typography>
                    </Box>
                    <Divider />
                    <ReactMarkdown children={payload.content} components={{
                        code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    showLineNumbers={true}
                                    PreTag="div"
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}/>
                </Box>
            </Paper>
        </Box>
    )
}