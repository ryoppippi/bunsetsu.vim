function! bunsetsu#tokenize(text, isKeyword) abort
  if denops#plugin#wait('bunsetsu') isnot# 0
    return ''
  endif

  let l:options =  {}
  let l:options.segmenter = get(g:, "bunsetsu#segmenter",  'tinysegmenter')
  let l:options.onlySegmentJapanese = get(g:, 'bunsetsu#onlySegmentJapanese', v:true)

  return denops#request('bunsetsu', 'tokenize', [a:text, a:isKeyword, l:options] )
endfunction

function! bunsetsu#tokenize_async(text, success, ...) abort
  if denops#plugin#wait('bunsetsu') isnot# 0
    return ''
  endif
  let l:options =  a:0 ? a:1 : {}
  let l:options.segmenter = get(g:, "bunsetsu#segmenter",  'tinysegmenter')
  let l:options.onlySegmentJapanese = get(g:, 'bunsetsu#onlySegmentJapanese', v:true)
  let l:Failure = get(l:option, 'failure', funcref('s:failure'))
  return denops#request_async(
        \ 'bunsetsu',
        \ 'tokenize',
        \ [a:value, l:option],
        \ { v -> a:success(v) },
        \ { e -> l:Failure(e) },
        \)
endfunction

function! s:failure(err) abort
  echoerr a:err
endfunction
