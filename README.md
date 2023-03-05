# Bunsetsu.vim

Bunsetsu (文節) is a Japanese word for a sentence.\
Bunsetsu.vim is
は[Tinysegmenter](http://chasen.org/~taku/software/TinySegmenter/)
等の分かち書きのライブラリを用いて、入力されたテキストを分かち書きするプラグインです。

## 必須条件

Kensaku は denops プラグインとして作られているため [Deno](https://deno.land) と
[vim-denops/denops.vim][vim-denops/denops.vim]
がインストールされている必要があります。

- [vim-denops/denops.vim][vim-denops/denops.vim]<br> An ecosystem for writing
  Vim/Neovim plugin in Deno.

[vim-denops/denops.vim]: https://github.com/vim-denops/denops.vim

## インストール

[Deno](https://deno.land) をインストール後
[vim-plug](https://github.com/junegunn/vim-plug)
などを利用して以下の様にインストールします。

```vim
Plug 'vim-denops/denops.vim'
Plug 'ryoppippi/bunsetsu.vim'
```

もしくは[lazy.nvim](https://github.com/folke/lazy.nvim)を用いるならば

```lua
return {
  'ryoppippi.bunsetsu.vim',
  dependencies = {
    'vim-denops/denops.vim',
  }
}
```

## 利用方法

### Plugins with Bunsetsu.vim

Check at [bunsetsu-vim github topic](https://github.com/topics/bunsetsu-vim)

### TypeScript からの利用 (denops)

-- 追記中

### Vim script からの利用

```vim
function! Tokenize(value) abort
  let @/ = a:value
  normal! n
endfunction

call Tokenize(bunsetsu#tokenize('文節でくぎろう',&l:iskeyword))
```

## TODO

-  テストの追加
-  TypeScript からの利用の追記
-  [Kuromoji](https://www.npmjs.com/package/kuromojin)追加

## Inspirations

- [deton/jasegment.vim](https://github.com/deton/jasegment.vim)
- [lambdalisue/kensaku.vim](https://github.com/lambdalisue/kensaku.vim)
- [TinySegmenter: Javascriptだけで実装されたコンパクトな分かち書きソフトウェア](http://chasen.org/~taku/software/TinySegmenter/)
- [code4fukui/TinySegmenter](https://github.com/code4fukui/TinySegmenter)

## License

MIT

## Author

Ryotaro "Justin" Kimura (a.k.a. ryoppippi)
