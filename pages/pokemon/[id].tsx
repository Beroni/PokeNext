import React from "react";
import styled from "styled-components";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import Head from "next/head";

interface Pokemon {
  name: string;
  id?: number;
  img?: string | undefined;
}

interface PokemonStaticProps {
  pokemon: Pokemon;
}

//

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  max-width: 800px;
  margin: 30px auto;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
`;

//
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      props: {},
    };
  }

  const pokemonResponseData = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${params.id}/`
  );
  const pokemonData = await pokemonResponseData.json();

  const pokemonImageResponseData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.id}/`
  );

  const pokemonImageData = await pokemonImageResponseData.json();

  const pokemon = {
    name: pokemonData.name,
    id: params.id,
    img: pokemonImageData.sprites.front_default,
  };

  return {
    props: {
      pokemon,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons = await fetch("https://pokeapi.co/api/v2/pokedex/1")
    .then((serverResponse) => {
      if (serverResponse.ok) {
        return serverResponse.json();
      }
    })
    .then((objectResponse) => {
      return objectResponse;
    });

  const pokemonStaticArray = pokemons.pokemon_entries.map((pokemon: any) => {
    return {
      params: {
        id: String(pokemon.entry_number),
      },
    };
  });

  return {
    paths: pokemonStaticArray,
    fallback: false,
  };
};

const Pokemon = ({ pokemon }: PokemonStaticProps) => {
  return (
    <>
      <Head>
        <title>
          {pokemon.name} #{pokemon.id}
        </title>
      </Head>
      <Container>
        <h1>{pokemon.name}</h1>
        <h2>Número : {pokemon.id}</h2>
        <img src={pokemon.img} alt="Pokemon"></img>
        <Link href="/">
          <a>Voltar</a>
        </Link>
      </Container>
    </>
  );
};

export default Pokemon;
