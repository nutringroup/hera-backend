import request  from "supertest";
import app_hera from "../app_hera";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInByb2ZpbGUiOjIzLCJpZE9mZmljZSI6MSwidGltZSI6IjIwMjItMDQtMjhUMTk6NDI6MDQuNDgyWiIsImlhdCI6MTY1MTE3NDkyNCwiZXhwIjoxNjUxMjYxMzI0fQ.B3W28BmXlSRMMupSbUceLzokIhO26wnmt6GY12kTMek';


describe('prospection just director', () => {

    test('get all squad', async () => {
        const res = await request(app_hera).get('/squad/get').set('Authorization', `bearer ${token}`);
    
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(expect.objectContaining({
            isDirector: expect.any(Boolean),
            squads: expect.any(Array)
        }));
    
    });

  });
