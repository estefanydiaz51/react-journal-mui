import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';


cloudinary.config({
    cloud_name: 'dcyclapct',
    api_key: '271671233549135',
    api_secret: 'Jc8BiGo4inVWDF-B3RGbuLigMrY',
    secure: true 
});
describe('Pruebas en fileUpload', () => { 
    // test('debe de subir el archivo a cloudinary', async() => { 

    //     const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
    //     const resp = await fetch( imageUrl );
    //     const blob = await resp.blob();
    //     const file = new File([ blob ], 'foto.jpg');

    //     const url = await fileUpload( file );
    //     expect ( typeof url ).toBe('string');

    //     const segments = url.split('/');
    //     const imageId = segments[ segments.length -1 ].replace('jpg', '');
    //     const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
    //         resource_type: 'image'
    //     });
    //     // console.log( cloudResp );
    // });

    // test('debe de retornar null', async() => { 
    //     const file = new File([], 'foto.jpg');
    //     const url = await fileUpload( file );
    //     expect( url ).toBe( null );
    // });
})