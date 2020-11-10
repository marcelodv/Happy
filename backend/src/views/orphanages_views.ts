import Orphanage from '../models/Orphanage'
import imageView from './images_views'

export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instrucions: orphanage.instrucions,
            opening_hours: orphanage.opening_hours, 
            open_on_weekend: orphanage.open_on_weekend,
            images: imageView.renderMany(orphanage.images)
        }
    },
    
    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage))
    }
}