import  logoImg  from '../../assets/logo.svg';
import { Button, Container, Content, Img } from './styles';

interface HeaderProps{
    onOpenNewTransectionModal: () => void;
}

export function Header({onOpenNewTransectionModal}: HeaderProps){

    return (
        <Container>
            <Content>
                <Img src={logoImg} alt="dtMoney" />
                <Button type="button" onClick={onOpenNewTransectionModal}>
                    Nova transação
                </Button>
            </Content>
        </Container>
    )
}