const obtenerEstadisticas = () => {
    const userId = getUserAuth().id

    $.ajax({
        url: `${BASE_URL}/posts?userId=${userId}`,
        method: "GET",
        dataType: "json",
        success: (data) => {
            data.forEach(post => {
                post.fecha = new Date(post.fecha);
            });

            const fechaActual = new Date();
            const enElDia = new Date(fechaActual);
            enElDia.setDate(fechaActual.getDate() - 1);

            const enLaSemana = new Date(fechaActual);
            enLaSemana.setDate(fechaActual.getDate() - 7);

            const enElMes = new Date(fechaActual);
            enElMes.setMonth(fechaActual.getMonth() - 1);

            const postHoy = data.filter(post => post.fecha > enElDia);
            const postSemana = data.filter(post => post.fecha > enLaSemana);
            const postsMes = data.filter(post => post.fecha > enElMes);


            Highcharts.chart('grafica', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Cantidad de Publicaciones'
                },
                xAxis: {
                    categories: ['Día', 'Semana', 'Mes', 'Todo']
                },
                yAxis: {
                    title: {
                        text: 'Cantidad'
                    }
                },
                series: [{
                    name: 'Cantidad de Publicaciones',
                    data: [postHoy.length, postSemana.length, postsMes.length, data.length]
                }]
            });
        },
        error: (error) => {
            console.error("Error al obtener los datos de las publicaciones:", error);
        }
    });
}
$(() => {
    obtenerEstadisticas()

})