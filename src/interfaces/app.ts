interface App {
    id: string | false,
    permissions: Array<string>,
    package_name: string,
    title: string,
    description: string,
    entry: string,
    special: Array<string>
}

export default App;