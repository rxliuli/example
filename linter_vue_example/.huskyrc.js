module.exports = {
  hooks: {
    // git commit 前的钩子
    'pre-commit': 'lint-staged',
    // 修复 IDEA 的一些奇怪问题 <https://youtrack.jetbrains.com/issue/IDEA-135454>
    'post-commit': 'git update-index --again',
  },
}