clean:
	rm -rf chromium
	rm -rf fonts

init:
	git clone --depth=1 https://github.com/sparticuz/chromium.git
	ts-node script/addCompilerOptions.ts chromium
	cd chromium && make chromium.zip
	mkdir fonts && cd fonts && curl -O https://moji.or.jp/wp-content/ipafont/IPAexfont/IPAexfont00401.zip && unzip IPAexfont00401.zip && mkdir .fonts && cp IPAexfont00401/*.ttf .fonts/ && zip -r fonts .fonts
