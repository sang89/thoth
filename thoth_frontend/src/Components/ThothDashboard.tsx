import ThothAppBar from './ThothAppBar';
import Container from '@material-ui/core/Container';

export const ThothDashboard = (props: any) => {
    return (
        <div>
            <ThothAppBar />
            <main>
                <Container maxWidth={false}>
                    {props.children}
                </Container>
            </main>
        </div>
    );
};