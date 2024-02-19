import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            pageSize: 20,
            totalResults: 0, // Add totalResults to the initial state
        };
    }

    async componentDidMount() {
        await this.fetchNews();
    }

    async fetchNews(page = 1) {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a5432d257dc2454db5639e0507e7bc1d&page=${page}&pageSize=${this.state.pageSize}`;
        const data = await fetch(url);
        const finalData = await data.json();
        this.setState({
            articles: finalData.articles,
            totalResults: finalData.totalResults,
            page,
        });
    }

    handleNextClick = async () => {
        const { page, totalResults, pageSize } = this.state;
        const nextPage = page + 1;
        if (nextPage > Math.ceil(totalResults / pageSize)) {
            return; // Reach the last page, do nothing
        }
        await this.fetchNews(nextPage);
    };

    handlePrevClick = async () => {
        const { page } = this.state;
        const prevPage = page - 1;
        if (prevPage < 1) {
            return; // Reach the first page, do nothing
        }
        await this.fetchNews(prevPage);
    };

    render() {
        const { articles, page } = this.state;

        return (
            <>
                <div className="container my-3 text-center">
                    <h2 className="my-3">PressPulse | Your Daily Dose of News.</h2>
                    <div className="row">
                        {articles.map((element) => (
                            <div className="col-lg-3 col-md-6  my-3" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title.slice(0, 40) : ''}
                                    description={element.description ? element.description.slice(0, 90) : ''}
                                    imageUrl={element.urlToImage ? element.urlToImage : 'https://sportshub.cbsistatic.com/i/r/2023/01/11/9693db2e-959d-4083-9159-7171ab331903/thumbnail/1200x675/938efe2208edad441a10ea4ae17b1e2d/mahomes-49ers-us.jpg'}
                                    newsUrl={element.url}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container d-flex justify-content-between mb-5">
                    <button
                        disabled={page <= 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePrevClick}
                    >
                        Previous
                    </button>
                    <button
                        disabled={page >= Math.ceil(this.state.totalResults / this.state.pageSize)}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNextClick}
                    >
                        Next
                    </button>
                </div>
            </>
        );
    }
}

export default News;