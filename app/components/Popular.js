var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');



class SelectLanguage extends React.Component {
    render(){
        var languages = ['All','JS','Ruby','Java','Python'];
        return(
            <ul className="languages">
                {languages.map(function (language) {
                    return (
                        <li
                            style={language === this.props.selectedLanguage ? {color: 'red'} : null}
                            onClick={this.props.onSelect.bind(null, language)}
                            key={language}>
                            {language}
                        </li>
                    )}, this)}
            </ul>
        )
    }
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

function ReposGrid(props){
    return(
        <ul className="popular-list">
            {props.repos.map(function (repo, index) {
                return(
                <li key={repo.name} className="popular-item">
                    <div className="popular-rank">#{index + 1}</div>
                    <ul className="space-list-items"></ul>
                    <li><img className="avatar" src={repo.owner.avatar_url}/></li>
                    <li><a href={repo.html_url}>{repo.name}</a> </li>
                    <li>@{repo.owner.login}</li>
                </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}

class Popular extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null,
        };

        this.updateLanguage = this.updateLanguage.bind(this)
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage(lang){
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });


        api.fetchPopularRepos(lang)
            .then(function (repos) {
               this.setState({repos: repos})
            }.bind(this))
    }

    render(){
        return(
            <div>
                <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage}/>
                {console.log(this.state.repos)}
                {!this.state.repos
                ? <p>Loading...</p>
                :<ReposGrid repos={this.state.repos} />}
            </div>
        )
    }
}

module.exports = Popular;