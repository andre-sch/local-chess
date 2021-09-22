# Local Chess

This is my first step in making an online chess app inspired by [chess.com](https://www.chess.com/).
The initial idea is to create a local game where you can play with a friend
on the same machine. After that, I will implement real-time communication
using WebSockets.

[![project.png](https://i.postimg.cc/7ZqjJzY8/project.png)](https://postimg.cc/Ln0xrn1N)

Built with:

- HTML
- CSS
- Javascript
- Node JS
- Express JS

## Getting Started

### Prerequisites

- [Node.js and NPM](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

### Installing

Clone repo:

```shell
git clone https://github.com/andre-sch/local-chess.git
```

Install dependencies:

```shell
cd .\local-chess\api\
npm install
```

Run node server to host images:

```shell
node .\server.js
```

Open app/index.html with a local development server like
[XAMPP](https://www.apachefriends.org/download.html) or
[VS Code](https://code.visualstudio.com/download)
[Live Server](https://github.com/ritwickdey/vscode-live-server)
extension (recommended).

## Contributing

First of all, PRs are welcome! :smile:

### What to Contribute

I'm not expecting commits that implement WebSockets, because I want to do
everything myself, but you can still contribute in other ways, like:

- Correct typos, grammatical and semantic errors
- Improve documentation
- Suggest layout and code changes
- Fix bugs

### How to Contribute

1. Fork my project
2. Clone your fork
3. Create another branch
4. Make your commits
5. Push this branch onto your fork
6. Open a Pull Request on GitHub

If you are new to these steps, take a look at [this documentation](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project)

## See Also

- All features of this project [in notion](https://global-angelfish-c41.notion.site/HTML-Local-Chess-34008dd2b3b74f0180b3910d400010bb)
- The modal cards of the game [in figma](https://www.figma.com/file/nKyr6dd7vB4mlqwxN7KNQ0/Chess-Cards?node-id=0%3A1)

## License

The files inside [.\api\assets\licensed](https://github.com/andre-sch/local-chess/tree/master/api/assets/licensed)
are licensed under **CC BY-SA 3.0**, see the [LICENSE.md](https://github.com/andre-sch/local-chess/blob/master/api/assets/licensed/LICENSE.md)
file for details. Besides that, the remaining files of this project are licensed
under **MIT**, check [LICENSE.txt](https://github.com/andre-sch/local-chess/blob/master/LICENSE.txt).

## Acknowledgments

- [chess.com](https://www.chess.com/) for the inspiration
- Cburnett for providing [chess role images](https://en.wikipedia.org/wiki/User:Cburnett/GFDL_images/Chess)
used in this repository
