function Layout(props) {
    return(
        <>
            <div className="layout_web">
                {props.children};
            </div>
        </>
    );
}

export default Layout;