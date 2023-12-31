import NavBar from '../../../components/Navbar'
import apiDeputados from "../../../services/conectaAPI"
import CardPartidos from '../../../components/CardPartidos';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';

export default function Favorites() {
    const [partidos, setPartidos] = useState([])
    const [partidosFav, setPartidosFav] = useState([])


    useEffect(() => {
        setPartidosFav(JSON.parse(window.localStorage.getItem("FavoritosPartidos")) ?? [])
    }, [])

    useEffect(() => {
        if (partidosFav.length > 0) {
            let idsFormatted = ""

            partidosFav.map((item) => {
                idsFormatted = idsFormatted + "&sigla=" + item.toLowerCase()
            })

            idsFormatted = idsFormatted.substring(1)

            getData(idsFormatted)
        }
    }, [partidosFav])

    async function getData(formattedText) {
        const resultConsult = await apiDeputados.get(`/partidos/?${formattedText}&ordem=ASC&ordenarPor=sigla`)
        const resultPartidos = resultConsult.data.dados

        setPartidos(resultPartidos)
    }


    const arrayNull = (teste) => {
        if (teste) setPartidos([])
    }

    return (
        <>
            <NavBar navBarLink={"/"} navBarItem="main">
                {partidos.length == 0 ?
                    <div className="py-5 mb-5 mt-5 m-auto" >
                        <Container style={{ marginTop: "4%" }}>
                            <StarIcon sx={{ color: "var(--amarelo)", width: "100%", fontSize: 'clamp(2em, 1em + 3vw,8em)', marginBottom: -3, filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))" }} />
                            <h1 className='text-center text-uppercase font-weight-bold mt-5 pt-5'>Ainda não há partidos favoritos!</h1>
                            <h4 className='text-center text-uppercase text-muted font-weight-bold mt-1 pt-3'>Favorite seus partidos.</h4>
                            <h4 className='text-center text-uppercase text-muted font-weight-bold mt-1 pt-3'>
                                <Link href="/partidos">
                                    <Button variant="contained" sx={{
                                        color: "var(--cinza-texto)",
                                        background: "var(--amarelo)",
                                        border: "3px solid var(--amarelo)",
                                        '&:hover': {
                                            color: "white",
                                            background: "var(--azul-escuro)",
                                            border: "3px solid var(--azul-escuro)",

                                        },
                                    }}>Escolher um partido</Button>
                                </Link>
                            </h4>
                        </Container>
                    </div>
                    :
                    <CardPartidos
                        arrayName={partidos}
                        textCenter="Seus partidos favoritados"
                        isFavoritePage={true}
                        favPageIsNull={arrayNull}
                    />
                }
            </NavBar>
        </>
    )
}