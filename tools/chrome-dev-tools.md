Chrome 59 发布之后，它的 Dev Tools 也作出了相应的更新。以下是一些新的特性。

1. coverage. coverage 面板可以显示页面中正在使用的 CSS 和 JS 文件，在开发者工具中按下 Ctrl +　Shift + P， 输入coverage，并在搜索结果中选择 Show Coverage 之后，就会显示 Coverage 面板，然后按下红色的 Start 按钮，就会获取页面中加载的 CSS 和 JS 文件， 单击相应的文件名，相应的文件会在 Source 面板中打开。

2. Fullpage ScreenShot. 获取整个网页的截屏图片。同样在 Ctrl + Shift + P 之后，输入 screenShot，选择 fullpage screenshot,就可以下载整个网站的截屏图片

3. Request Block. 请求封锁，可以设置禁止加载某些请求类型的文件，同样在 Ctrl + Shift + P 中输入 request blocking，选择之后，在打开的面板中点击 + 按钮，在文本框中输入 ***.css**，则会封锁页面中的所有 CSS 文件，刷新页面可见效果，并且可以在 Network 面板中看见所有的 CSS 文件请求变成了红色（请求失败）。

4. Unified Command Menu. 显示所有可以用到的命令菜单，在 Ctrl + Shift + P 面板下，直接输入 ? 号，就可以显示你可以进行的操作，例如打开文件，跳转行等操作。
