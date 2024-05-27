declare module '*.sass' {
    type IClassNames = Record<string, string>
    const classNames: IClassNames
    export = classNames
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
    const content: React.VFC<React.SVGProps<SVGSVGElement>>
    export default content
}