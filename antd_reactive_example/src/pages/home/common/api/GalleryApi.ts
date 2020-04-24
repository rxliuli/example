import { Page, PageData } from '../../../../common/business/Page'
import { range } from 'rx-util'

class GalleryApi {
    async page({ offset, size }: Page) {
        return {
            offset,
            size,
            total: 100,
            list: range(offset, offset + size),
        } as PageData<number>
    }
}

export const galleryApi = new GalleryApi()
