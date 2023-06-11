all:
	@echo "Select target"

pub:
	npm run build
	npm publish --access public
