const setup = () => {
    console.log('setup')

    $('#filterBtn').click(async () => {
        const query =  {
            type: 'filterSearch',
            projectionFilters: {
                name: $('#filterName').is(':checked'),
                weight: $('#filterWeight').is(':checked'),
            }
        }
        const res = await axios.post('http://localhost:5000/search', query)

        $('#searchResults').empty()
        $('#searchResults').html(JSON.stringify(res.data))
    })

    $('#nameSearchButton').click(async () => {
        // build the name search query
        const query = {
            type: 'nameSearch',
            name: $('#nameSearchInput').val(),
            projectionFilters: {
                name: $('#filterName').is(':checked'),
                weight: $('#filterWeight').is(':checked'),
            }
        }

        const res = await axios.post('http://localhost:5000/search', query)

        $('#searchResults').empty()
        $('#searchResults').html(JSON.stringify(res.data))
    })

    $('#weightSearchBtn').click(async () => {
        // build the weight search query
        const query = {
            type: 'weightSearch',
            minWeight: Number($('#minWeightInput').val()),
            maxWeight: Number($('#maxWeightInput').val()),
            projectionFilters: {
                name: $('#filterName').is(':checked'),
                weight: $('#filterWeight').is(':checked'),
            }
        }

        const res = await axios.post('http://localhost:5000/search', query)

        $('#searchResults').empty()
        $('#searchResults').html(JSON.stringify(res.data))
    })

    $('#fruitSearchBtn').click(async () => {
        // build the weight search query
        const query = {
            type: 'fruitSearch',
            likesApples: $('#searchApple').is(':checked'),
            likesCarrots: $('#searchCarrot').is(':checked'),
            projectionFilters: {
                name: $('#filterName').is(':checked'),
                weight: $('#filterWeight').is(':checked'),
            }
        }
        const res = await axios.post('http://localhost:5000/search', query)

        $('#searchResults').empty()
        $('#searchResults').html(JSON.stringify(res.data))
    })  
}

$(document).ready(setup)