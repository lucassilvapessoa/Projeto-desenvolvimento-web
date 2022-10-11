module.exports = {
    getPaintings: (dbConnection, [id], callback) => {
        console.log('[ponto turistico detalhado]');
        const sql = 'select * from pontoturistico where idpontoturistico = ?';
        console.log("Realizando consulta....")
        dbConnection.query(sql,[id], callback)
    },
    deletePainting:(dbConnection, [id], callback) => {
        console.log('[excluir ponto turistico]')
        console.log('idpontoturustico', id)
        const sql = 'delete from pontoturistico where idpontoturistico = ?';
        console.log("Realizando exclusão")
        dbConnection.query(sql, [id], callback);
    }
}