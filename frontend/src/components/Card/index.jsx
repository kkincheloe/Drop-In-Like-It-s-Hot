export default function Card({ pois }) {
    return (
        <figure>
            <img src={pois.images.web.url} />
            
            <figcaption>
                <h1>{pois.name}</h1>
            </figcaption>
        </figure>
    )
}