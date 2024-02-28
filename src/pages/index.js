/* eslint-disable */
import Head from 'next/head'
import Stepper from '@/components/Stepper'
export default function Home({ categories }) {

    return (
        <div>
            <Head>
                <title>Stepper</title>
            </Head>
            <div
                className="min-h-screen w-screen flex justify-center items-center "
                style={{ backgroundImage: "url('/images/marbre2.png')" }}>
                <Stepper categories={categories} />
            </div>
        </div>
    )
}

// Cette fonction est appelée à chaque requête côté serveur
export async function getServerSideProps() {
    try {
        const res = await fetch(`${process.env.backend_url}/api/categoriesWeb`)
        //console.log("🚀 ~ file: index.js:53 ~ getServerSideProps ~ categories:", res.data)

        const data = await res.json()



        return { props: { categories: data.categories || [] } }
    } catch (error) {
        //console.error('Error fetching data from API:', error.message)
        return { props: { categories: [] } }
    }
}
