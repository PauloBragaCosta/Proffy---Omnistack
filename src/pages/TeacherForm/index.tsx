import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';

import PageHeader from '../../Components/PageHeader';
import Input from '../../Components/Input';
import Textarea from '../../Components/Textarea';
import Select from '../../Components/Select';
import api from '../../api';


import warningIcon from '../../assets/images/icons/warning.svg';


import './styles.css';


function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');



    const [scheduleItems, setScheduleitems] = useState([
        {week_day: 0, from: '', to: ''}

    ]);


    function addNewScheduleItem() {
        setScheduleitems([
            ...scheduleItems, {week_day: 0, from: '', to: ''}
        ]);
    }

    

    function setScheduleitemsValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItems, index) => {
            if (index === position) {
                return { ...scheduleItems, [field]: value };
            }

            return scheduleItems;
        });

        setScheduleitems(updatedScheduleItems);

        
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            history.push('/');
            
        }).catch(() => {
            alert('Erro no cadastro!')
        })
    }
    

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title="Que incrivel que você quer dar aulas"
            description="O primeiro passao é preencher esse formulario de inscrição"
             />

             <main>
                 <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input name="name" label="Nome completo" value={name} onChange={(e) => {setName(e.target.value)}} />
                        <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => {setAvatar(e.target.value)}} />
                        <Input name="Whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}} />
                        <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => {setBio(e.target.value)}} />
                    
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={(e) => {setSubject(e.target.value)}}

                        options={[
                            { value: 'Artes', label: 'Artes'},
                            { value: 'Biologia', label: 'Biologia'},
                            { value: 'Ciências', label: 'Ciências'},
                            { value: 'Educação física', label: 'Educação física'},
                            { value: 'Física', label: 'Física'},
                            { value: 'Geografia', label: 'Geografia'},
                            { value: 'História', label: 'História'},
                            { value: 'Matemática', label: 'Matemática'},
                            { value: 'Português', label: 'Português'},
                            { value: 'Química', label: 'Química'}
                        ]} 
                        />
                        
                        <Input name="cost" 
                        label="Custo da sua hora por aula"
                        value={cost}
                        onChange={(e) => {setCost(e.target.value)}}
                        />
                    
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponiveis
                            <button type="button" onClick={addNewScheduleItem}>
                            + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                            <div key={scheduleItem.week_day} className="schedule-item">
                            <Select 
                            name="week_day" 
                            label="Dia da semana"
                            value={scheduleItem.week_day}
                            onChange={e => setScheduleitemsValue(index, 'week_day', e.target.value)}
                            options={[
                                { value: '0', label: 'Domingo'},
                                { value: '1', label: 'Segunda-feira'},
                                { value: '2', label: 'Terça-feira'},
                                { value: '3', label: 'Quarta-feira'},
                                { value: '4', label: 'Quinta-feira'},
                                { value: '5', label: 'sexta-feira'},
                                { value: '6', label: 'Sabado'},
                            ]} 
                            />
                            <Input name="from" label="Das" type="time" value={scheduleItem.from} onChange={e => setScheduleitemsValue(index, 'from', e.target.value)} />
                            <Input name="to" label="Até" type="time" value={scheduleItem.to} onChange={e => setScheduleitemsValue(index, 'to', e.target.value)} />

                        </div>
                            )
                        })}
                        
                    </fieldset>
                    
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Prencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
             </main>
        </div>
    );
}

export default TeacherForm;