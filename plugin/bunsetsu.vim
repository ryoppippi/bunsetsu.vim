if exists('g:loaded_bunsetsu') | finish | endif
let g:loaded_bunsetsu = 1

if !exists('g:bunsetsu#segmenter')
  let g:bunsetsu#segmenter = 'tinysegmenter'
endif
if !exists('g:bunsetsu#onlySegmentJapanese')
  let g:bunsetsu#onlySegmentJapanese = v:true
endif

