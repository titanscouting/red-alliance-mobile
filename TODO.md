# Typescript

React Native complaints that prop types are depreciated, so I figured I could convert the project to Typescript.
I figured that this would also make the code easier to read and reason about (since variables can only be one type, and it would disallow type abuse).
Unfortunately, after doing that, much of the code had Typescript errors due to invalid types. Also, there is no automated way to infer state type. As it is, it doesn't make much sense to try to fix that as long as we have a working product.
That's why I'm putting my work here and documenting it for posterity if anyone ever decides to undertake this massive project of converting the code base to typescript.

1. Convert PropTypes to interfaces
    ```bash
    shopt -s globstar  # On windows, globstar was disabled for some reason. See https://unix.stackexchange.com/a/315116
    npx jscodeshift -t https://mskelton.dev/ratchet.ts src/**/*.{js,jsx} --preserve-prop-types=unconverted  # Docs: https://github.com/mskelton/ratchet
    ```
2. Manually fix instances that could not be automatically converted
3. Fix everything else :/
